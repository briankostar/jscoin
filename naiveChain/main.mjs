'use strict';

// var CryptoJS = require("crypto-js");
import CryptoJS from "crypto-js";
import express from "express";
import bodyParser from "body-parser";
import WebSocket from "ws";

const http_port = process.env.HTTP_PORT || 3001;
const p2p_port = process.env.P2P_PORT || 6001;
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class Block {
    constructor(index, previousHash, timeStamp, data, hash) {
        this.index = index;
        this.previousHash = previousHash.toString();
        this.timeStamp = timeStamp;
        this.data = data;
        this.hash = hash.toString();
    }
}

let sockets = [];
let MessageType = {
    QUERY_LATEST: 0;
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
}

let getGenesisBlock = () => {
    return new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
};

let blockchain = [getGenesisBlock()];

