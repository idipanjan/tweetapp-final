package com.dipanjan.tweetapp.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class KafkaListeners {

    @KafkaListener(topics="tweetapp", groupId="groupId")
    void listener(String data) {
        log.warn("Listener recieved " + data);
    }
}
