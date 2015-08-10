package com.Team11.Controller;


import com.Team11.Model.Card;
import com.Team11.Model.CardOnDeck;
import com.Team11.Model.Game;
import com.Team11.Model.User;
import com.Team11.Service.GameService;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.servlet.http.HttpServlet;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
// Ref : https://jersey.java.net/documentation/latest/jaxrs-resources.html#d0e2011

/**
 *
 * @author MZN
 */
@Path("/game")
@Stateless
public class GameServlet extends HttpServlet {
    
    @Inject
    GameService gameService ;
   
    @GET
    @Produces("application/json")
    @Path("/createNewGame")
    public JsonObject createNewGame() {
        Game game = gameService.createGame(new User("demo"));
        
        return game.toJson();
    }

    @GET
    @Produces("application/json")
    @Path("/getAllCards")
    public JsonObject showAllCards() {
        CardOnDeck cardOnDeck = new CardOnDeck();
        cardOnDeck.getCards();
        JsonObjectBuilder results = Json.createObjectBuilder();
        JsonArrayBuilder cards = Json.createArrayBuilder();
        int i = 0;
        for (Card card : cardOnDeck.gameCards) {
            cards.add(card.toJson());
            i++;
        }
        results.add("cards", cards.build());
        return results.build();
    }

    @GET
    @Produces("application/json")
    @Path("/getShuffleCards")
    public JsonObject showShuffleCards() {
        CardOnDeck cardOnDeck = new CardOnDeck();
        cardOnDeck.getCards().shuffleCards();
        JsonObjectBuilder results = Json.createObjectBuilder();
        JsonArrayBuilder cards = Json.createArrayBuilder();
        int i = 0;
        for (Card card : cardOnDeck.gameCards) {
            cards.add(card.toJson());
            i++;
        }

        results.add("cards", cards.build());
        return results.build();
    }



    @GET
    @Produces(value = "application/json")
    @Path(value = "/openExistingGame")
    public JsonObject doOpenExistingGame(@Context UriInfo info ) {
        String id = info.getQueryParameters().getFirst("id");
        if(id!=null){
            gameService.getGame(id).toJson();
        }
        return null;
    }
}
