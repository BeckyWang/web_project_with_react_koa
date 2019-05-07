//
// Autogenerated by Thrift Compiler (0.12.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = module.exports = {};
var Article = module.exports.Article = function(args) {
    this.id = null;
    this.text = null;
    if (args) {
        if (args.id !== undefined && args.id !== null) {
            this.id = args.id;
        }
        if (args.text !== undefined && args.text !== null) {
            this.text = args.text;
        }
    }
};
Article.prototype = {};
Article.prototype.read = function(input) {
    input.readStructBegin();
    while (true) {
        var ret = input.readFieldBegin();
        var ftype = ret.ftype;
        var fid = ret.fid;
        if (ftype == Thrift.Type.STOP) {
            break;
        }
        switch (fid) {
            case 1:
                if (ftype == Thrift.Type.STRING) {
                    this.id = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype == Thrift.Type.STRING) {
                    this.text = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
    return;
};

Article.prototype.write = function(output) {
    output.writeStructBegin('Article');
    if (this.id !== null && this.id !== undefined) {
        output.writeFieldBegin('id', Thrift.Type.STRING, 1);
        output.writeString(this.id);
        output.writeFieldEnd();
    }
    if (this.text !== null && this.text !== undefined) {
        output.writeFieldBegin('text', Thrift.Type.STRING, 2);
        output.writeString(this.text);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
};

var Summarization = module.exports.Summarization = function(args) {
    this.id = null;
    this.summarization = null;
    if (args) {
        if (args.id !== undefined && args.id !== null) {
            this.id = args.id;
        }
        if (args.summarization !== undefined && args.summarization !== null) {
            this.summarization = args.summarization;
        }
    }
};
Summarization.prototype = {};
Summarization.prototype.read = function(input) {
    input.readStructBegin();
    while (true) {
        var ret = input.readFieldBegin();
        var ftype = ret.ftype;
        var fid = ret.fid;
        if (ftype == Thrift.Type.STOP) {
            break;
        }
        switch (fid) {
            case 1:
                if (ftype == Thrift.Type.STRING) {
                    this.id = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            case 2:
                if (ftype == Thrift.Type.STRING) {
                    this.summarization = input.readString();
                } else {
                    input.skip(ftype);
                }
                break;
            default:
                input.skip(ftype);
        }
        input.readFieldEnd();
    }
    input.readStructEnd();
    return;
};

Summarization.prototype.write = function(output) {
    output.writeStructBegin('Summarization');
    if (this.id !== null && this.id !== undefined) {
        output.writeFieldBegin('id', Thrift.Type.STRING, 1);
        output.writeString(this.id);
        output.writeFieldEnd();
    }
    if (this.summarization !== null && this.summarization !== undefined) {
        output.writeFieldBegin('summarization', Thrift.Type.STRING, 2);
        output.writeString(this.summarization);
        output.writeFieldEnd();
    }
    output.writeFieldStop();
    output.writeStructEnd();
    return;
};