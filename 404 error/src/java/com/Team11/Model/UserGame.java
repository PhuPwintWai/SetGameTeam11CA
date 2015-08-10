/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Team11.Model;

import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author pannthee
 */
@Entity
public class UserGame {
    @Id @Column (name="ugID") private int ugID;
    private int gameid;
    private int userid;

    public int getGameid() {
        return gameid;
    }

    public void setGameid(int gameid) {
        this.gameid = gameid;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    
    public JsonObject toJson(){
         return (Json.createObjectBuilder()
                 .add("gameID", gameid)
                 .add("userID", userid)
                 .build());
    }
    
    @Override
    public String toString() {
        return "UserGame{" + "ugid=" + ugID + ", gameid=" + gameid + ", userid=" + userid + '}';
    }
    
}
