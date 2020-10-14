const config = require("./config");
const replies = require("./replies");

const {Client} = require("discord.js");

const client = new Client();

const PREFIX = "pl";

client.on('ready',()=>{
    console.log(`${client.user.username} is here`);
})

client.on('message', async(message)=>{   
    console.log(`${message.author.username} says ${message.content}`); 

    if(message.content==="hello" || message.content==="hi" || message.content==="hey"){
        message.reply("hello, there");
    }     

    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.substring(PREFIX.length).trim().split(/\s+/);  
        
        if(CMD_NAME==="kick")
        {   
            if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("You better don't use this command")
            if(args.length === 0) return message.reply("Enter a valid ID");
            const member = message.guild.members.cache.get(args[0]);  
            
            if(member){
                member.kick()
                .then((member)=>{
                    message.channel.send(`${member.user} has been kicked off`);
                })
                .catch((err)=>{
                    message.channel.send(`You are going beyond your limit`);
                })
            }
            else{
                message.channel.send("Member not found");
            }
        }

        else if(CMD_NAME==="ban")
        {
            if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("You better don't use this command");
            if(args.length === 0) return message.reply("Enter a valid ID");
            try{
                const user = await message.guild.members.ban(args[0])  
                message.channel.send(` ${user} has been banned`);
            }
            catch(err){
                message.channel.send(`You are going beyond your limit`);
            }
        }

        else if(CMD_NAME==="roast")
        {   
            if(args.length === 0) return message.reply("Enter a valid ID");
            try{
                const reply = (Math.floor(Math.random()*4)+1);

                message.channel.send(replies.reply[reply]);
            }
            catch(err){
                message.channel.send(`You are going beyond your limit`);
            }
        }
    }
})

client.login(config.DISCORD_TOKEN);





// client is a class that allow us to use discord api 
// then we need to create an instance of the class.
// if(message.author.bot) return;   // to check if the author of the message is a bot or not.
// here message is the input that the user sends.
// The spread operator pack, unpack all the string left after the command(CMD_NAME); so if there are 3 things after cmd_name separated by " " then only args will give the 1st index elemnt only while ...args will give everything after cmd_name in an array of items.
// args[0]: b/c we want to kick out one user at a time.  // get() is a get member function.
// Reg-ex: Won't treat whitespace as an different object.
