package com.q_a.demo.controllers;

import com.q_a.demo.dto.QuestionDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.*;

@Controller
public class MainController {

    @GetMapping("/")
    public ModelAndView getMainPage(ModelAndView modelAndView){
        modelAndView.setViewName("mainPage");
        return modelAndView;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<QuestionDto>> getAllUsers() {
        List<QuestionDto> list = Arrays.asList(new QuestionDto(),new QuestionDto(),new QuestionDto(),new QuestionDto());
        return ResponseEntity.ok(list);
    }

    @ResponseBody
    @PostMapping(value = "/pagination")
    public ResponseEntity<Map<Long, List<QuestionDto>>> getPaginationQuestion(@RequestParam(value = "page", required=false) Integer page, @RequestParam(value = "size", required=false) Integer size) {
        List<QuestionDto> list = Arrays.asList(new QuestionDto(), new QuestionDto(), new QuestionDto(),new QuestionDto(),new QuestionDto(), new QuestionDto());
        Map<Long, List<QuestionDto>> map = new HashMap<Long, List<QuestionDto>>(){
            {
                put((long) 9, list);
            }
        };
        return ResponseEntity.ok(map);
    }
}
