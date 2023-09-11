package com.websockt.websocket.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeContrller {
    
    @GetMapping("/")
    public String home(){
        return "index";
    }
}
