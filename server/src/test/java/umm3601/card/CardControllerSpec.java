package umm3601.card;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import umm3601.card.CardController;
import umm3601.deck.DeckController;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;


public class CardControllerSpec {
    private DeckController deckController;
    private CardController cardController;
    private ObjectId testDeckId;

    private List<Document> testCards;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("i1-droptable-test");
        MongoCollection<Document> deckDocuments = db.getCollection("decks");
        MongoCollection<Document> cardDocuments = db.getCollection("cards");
        deckDocuments.drop();
        cardDocuments.drop();
        List<Document> testDecks = new ArrayList<>();
        testDecks.add(Document.parse("{\n" +
            "        \"name\": \"test deck 1\",\n" +
            "        \"cards\": [\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b4\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b6\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b7\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b8\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b9\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9ba\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bb\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bc\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bd\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9be\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bf\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac25d47c9429bff9ba909\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9c0\"\n" +
            "            }\n" +
            "        ]\n" +
            "    }"
        ));

        testDecks.add(Document.parse("{\n" +
            "        \"name\": \"test deck 2\",\n" +
            "        \"cards\": [\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bc\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "            }\n" +
            "        ]\n" +
            "    }"
        ));

        testDeckId = new ObjectId();
        ObjectId[] cards = {new ObjectId("59dac7b147c9429bff9ba9b3"),
            new ObjectId("59dac7b147c9429bff9ba9bc"),
            new ObjectId("59dac7b147c9429bff9ba9b5")};

        BasicDBObject testDeck = new BasicDBObject("_id", testDeckId)
            .append("name", "test deck 3")
            .append("cards", cards);

        deckDocuments.insertMany(testDecks);
        deckDocuments.insertOne(Document.parse(testDeck.toJson()));

        testCards = new ArrayList<>();
        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "        },\n" +
            "        \"word\": \"Aesthetic reading\",\n" +
            "        \"synonym\": [\"artistic\"],\n" +
            "        \"antonym\": [\"Efferant Reading\"],\n" +
            "        \"general_sense\": [\"a term to describe reading for pleasure\"],\n" +
            "        \"example_usage\": [\"A readers response that is driven by personal feelings from the transactionbetween the reader with text Louise Rosenblatt 1978 term\"\n]" +
            "    }"));
        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9bb\"\n" +
            "        },\n" +
            "        \"word\": \"Automaticity\",\n" +
            "        \"synonym\": [\"Fluency\"],\n" +
            "        \"antonym\": [\"difficult\"],\n" +
            "        \"general_sense\": [\"rapid and fluent recognition of words requiring only a minumm of effort and attention\"],\n" +
            "        \"example_usage\": [\"Automatic processing of information from text including comprehension, decoding words and other tasks\"\n]" +
            "    }"));
        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "        },\n" +
            "        \"word\": \"Plethora\",\n" +
            "        \"synonym\": [\"Excess\", \"plenty\"],\n" +
            "        \"antonym\": [\"Lack\", \"scarcity\", \"few\"],\n" +
            "        \"general_sense\": [\"overabundance\"],\n" +
            "        \"example_usage\": [\"There was a plethora of rubber duckies in the pool.\"\n]" +
            "    }"));
        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9bc\"\n" +
            "        },\n" +
            "        \"word\": \"puckish\", \n" +
            "        \"synonym\": [\"mischievious\"],\n" +
            "        \"antonym\": [\"grim\"],\n" +
            "        \"general_sense\": [\"tending to or exhibiting reckless playfulness\"],\n" +
            "        \"example_usage\": [\"The puckish boys loved practical jokes.\"\n]" +
            "    }"));



        cardDocuments.insertMany(testCards);
        cardController = new CardController(db);
        deckController = new DeckController(db);
    }

    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
            = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }



    public List<String> getStringsFromBsonArray(BsonArray docs, String field) {
        return docs.stream()
            .map(x -> x.asDocument().getString(field).getValue())
            .sorted()
            .collect(Collectors.toList());
    }


    @Test
    public void testDeckSetUp() {
        String jsonResult = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }

    @Test
    public void getAllCards() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 cards", 4, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Automaticity", "Plethora","puckish");
        assertEquals("Words should match", expectedWords, words);
    }

    @Test
    public void getCardById() {
        String jsonResult = cardController.getCard("59dac7b147c9429bff9ba9b3");
        Document testCard = Document.parse(jsonResult);
        assertEquals("Word should match", "Aesthetic reading", testCard.get("word"));
    }

    @Test
    public void addNewCard() {
        BasicDBList synonym = new BasicDBList();
        synonym.add("rad");
        synonym.add("slick");
        BasicDBList antonym = new BasicDBList();
        antonym.add("bogus");
        BasicDBList general_sense = new BasicDBList();
        general_sense.add("something that is radical and stuff");
        general_sense.add("really slick my dude");
        BasicDBList example_usage = new BasicDBList();
        example_usage.add("Todd is cool as heck");
        example_usage.add("Todd is cool as ice");
        example_usage.add("Todd is the coolest dude around");

        cardController.addNewCard(true, testDeckId.toHexString(), "Cool", synonym, antonym, general_sense, example_usage);

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 5 cards", 5, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Automaticity", "Cool", "Plethora", "puckish");
        assertEquals("Words should match", expectedWords, words);
    }



    @Test
    public void addToDeck() {
        BasicDBList synonym = new BasicDBList();
        BasicDBList antonym = new BasicDBList();
        BasicDBList general_sense = new BasicDBList();
        BasicDBList example_usage = new BasicDBList();
        synonym.add("basically");
        synonym.add("essentially");
        antonym.add("absolutely");
        general_sense.add("near completion");
        general_sense.add("review/QA");
        example_usage.add("This is virtually done");


        cardController.addNewCard(true, testDeckId.toHexString(), "Virtually", synonym, antonym, general_sense, example_usage);


        String jsonResult = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 4 cards in the deck", 4, cards.size());
    }
    @Test
    public void tryAddWithNullParameters() {
        cardController.addNewCard(false, null, null, null, null, null, null);

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 cards", 4, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Automaticity", "Plethora", "puckish");
        assertEquals("Words should match", expectedWords, words);

        // Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult2 = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult2);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }

    @Test
    public void tryAddWithEmptyFields() {
        BasicDBList synonym = new BasicDBList();
        BasicDBList antonym = new BasicDBList();
        BasicDBList general_sense = new BasicDBList();
        BasicDBList example_usage = new BasicDBList();
        cardController.addNewCard(true, "", "", synonym, antonym, general_sense, example_usage);


        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 cards", 4, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Automaticity", "Plethora", "puckish");
        assertEquals("Words should match", expectedWords, words);

        // Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult2 = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult2);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }

    @Test
    public void tryAddWithOneEmptyStrings() {
        BasicDBList synonym = new BasicDBList();
        synonym.add("rad");
        synonym.add("slick");
        BasicDBList antonym = new BasicDBList();
        antonym.add("bogus");
        BasicDBList general_sense = new BasicDBList();
        general_sense.add("something that is radical and stuff");
        general_sense.add("really slick my dude");
        BasicDBList example_usage = new BasicDBList();
        example_usage.add("Todd is cool as heck");
        example_usage.add("Todd is cool as ice");
        example_usage.add("Todd is the coolest dude around");
        cardController.addNewCard(true,"deckID", "", synonym, antonym, general_sense, example_usage);

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 cards", 4, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Automaticity", "Plethora", "puckish");
        assertEquals("Words should match", expectedWords, words);

        // Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult2 = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult2);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }

    @Test
    public void tryAddWithoutGettingCorrectPassword() {
        BasicDBList synonym = new BasicDBList();
        synonym.add("rad");
        synonym.add("slick");
        BasicDBList antonym = new BasicDBList();
        antonym.add("bogus");
        BasicDBList general_sense = new BasicDBList();
        general_sense.add("something that is radical and stuff");
        general_sense.add("really slick my dude");
        BasicDBList example_usage = new BasicDBList();
        example_usage.add("Todd is cool as heck");
        example_usage.add("Todd is cool as ice");
        example_usage.add("Todd is the cool dude around");
        cardController.addNewCard(false,"deckID", "wooo", synonym, antonym, general_sense, example_usage);

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 cards", 4, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Automaticity", "Plethora", "puckish");
        assertEquals("Words should match", expectedWords, words);

        // Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult2 = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult2);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }
}
