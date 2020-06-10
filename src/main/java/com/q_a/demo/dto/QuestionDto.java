package com.q_a.demo.dto;


import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.q_a.demo.model.Tags;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.Arrays;
import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class QuestionDto {
    public int countValuable = 2;
    public int countAnswer = 3;
    public int viewCount = 4;
    public String title = "Question#1";
    public List<Tags> tags = Arrays.asList(new Tags(1, "tag"), new Tags(2, "tag2"));
    public String userId = "linktoUser";
    public Integer reputationCount = 5;
    public LocalDateTime persistDateTime = LocalDateTime.of(2014, Month.JANUARY, 1, 10, 10, 30);
    public boolean helpful = false;

    public QuestionDto(){}

    public List<Tags> getTags() {
        return tags;
    }
}
