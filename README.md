# CHAT APP 

<h2>what the user can send </h2>

1)join a room
```
{
    "type": "join",
    "payload": {
        "roomId":"123"
    }
}

```

2)send a message 
```
{
    "type": "chat",
    "payload": {
        "message": "hi"
    }

}

```

<h2>what the server can send /user recieves</h2>

1)message
```
{
    "type":"chat",
    "payload": {
        "message": "hi",
    }
}
```