#zookeeper
.\bin\windows\zookeeper-server-start.bat config\zookeeper.properties

#kafka server
.\bin\windows\kafka-server-start.bat config\server.properties


#kafka consumer
.\bin\windows\kafka-console-consumer.bat --topic tweetapp --from-beginning --bootstrap-server ctsjava557.iiht.tech:9092

#swagger
http://localhost:9999/swagger-ui/index.html#/user-controller