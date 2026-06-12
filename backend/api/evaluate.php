<?php

require __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../config/database.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


$prompt = "
Rispondi solo con JSON valido.
Non scrivere testo fuori dal JSON.

Formato:
{
  \"suggested_price\": 22,
  \"range\": {
    \"min\": 18,
    \"max\": 27
  },
  \"image_analysis\": \"Nella foto è visibile una scarpa sportiva nera...\",
  \"motivation\": \"spiegazione del prezzo\",
  \"selling_tips\": [
    \"consiglio 1\",
    \"consiglio 2\"
  ],
  \"listing_description\": \"descrizione pronta per un annuncio di vendita\"
}

IMPORTANTE:

Analizza attentamente l'immagine caricata.

La valutazione deve basarsi sia sui dati forniti dall'utente sia su ciò che è realmente visibile nella foto.

Compila sempre il campo 'image_analysis' descrivendo brevemente ciò che vedi nell'immagine.

Non dare per scontato che i dati inseriti dall'utente siano corretti.

Se il brand, la categoria o lo stato indicati dall'utente non corrispondono a ciò che è visibile nella foto, segnalalo chiaramente nel campo 'motivation'.

Restituisci valori realistici.
La motivazione deve spiegare chiaramente la valutazione del capo.
I suggerimenti di vendita devono essere pratici e utili.

Compila il campo 'listing_description' con una descrizione breve, chiara e pronta per essere pubblicata su marketplace come Vinted o Subito.

Dati utente:
Brand: {$_POST['brand']}
Stato: {$_POST['status']}
Categoria: {$_POST['category']}
";

$imageContent = file_get_contents(
    $_FILES["photo"]["tmp_name"]
);

$imageBase64 = base64_encode($imageContent);

$client = OpenAI::client($_ENV["OPENAI_API_KEY"]);

try {
    $response = $client->chat()->create([
        "model" => "gpt-4o-mini",
        "response_format" => [
            "type" => "json_object"
        ],
        "messages" => [
            [
                "role" => "user",
                "content" => [
                    [
                        "type" => "text",
                        "text" => $prompt
                    ],
                    [
                        "type" => "image_url",
                        "image_url" => [
                            "url" => "data:image/jpeg;base64," . $imageBase64
                        ]
                    ]
                ]
            ]
        ]
    ]);
} catch (Exception $e) {
    echo $e->getMessage();
    exit;
}

$suggestion = $response["choices"][0]["message"]["content"];

$outfit = json_decode($suggestion, true);

$sql = "INSERT INTO evaluations (
brand,
category,
item_condition,
suggested_price,
min_price,
max_price,
image_analysis,
motivation,
selling_tips,
listing_description
)
VALUES (
:brand,
:category,
:item_condition,
:suggested_price,
:min_price,
:max_price,
:image_analysis,
:motivation,
:selling_tips,
:listing_description
)
";


$stmt = $pdo->prepare($sql);
$stmt-> execute([
    "brand" => $_POST["brand"],
    "category" => $_POST["category"],
    "item_condition" => $_POST["status"],
    "suggested_price" => $outfit["suggested_price"],
    "min_price" => $outfit["range"]["min"],
    "max_price" => $outfit["range"]["max"],
    "image_analysis" => $outfit["image_analysis"],
    "motivation" => $outfit["motivation"],
    "selling_tips" => json_encode($outfit["selling_tips"]),
    "listing_description" => $outfit["listing_description"]
]);

echo json_encode($outfit);
exit;
?>