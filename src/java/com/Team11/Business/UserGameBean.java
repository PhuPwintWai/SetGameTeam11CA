/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.Team11.Business;


import com.Team11.Model.UserGame;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class UserGameBean {
    
    @PersistenceContext(name = "JQueryMobileTestingPU") 
       private EntityManager em;
    public void setUserGame(int userid, int gameID)
        {
            UserGame ug = new UserGame();
            ug.setGameid(gameID);
            ug.setUserid(userid);
            System.out.println("game id is : "+ ug.getGameid());
            em.persist(ug);
        }

}
