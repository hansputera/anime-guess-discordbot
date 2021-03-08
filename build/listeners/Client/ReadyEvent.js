"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class ReadyEvent extends discord_akairo_1.Listener {
    constructor(client) {
        super('ReadyEvent', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
        this.client = client;
    }
    exec() {
        console.log(this.client.user.tag, 'is ready');
        // register each user to database.
        this.client.users.cache.forEach(user => {
            this.client.userManager.all().then(userDBs => {
                if (user.bot)
                    return;
                if (!userDBs.find(userDB => userDB.id === user.id)) {
                    this.client.userManager.add(user.id);
                    console.log(user.tag, 'added');
                }
            });
        });
        // register each guild to database.
        this.client.guilds.cache.forEach(guild => {
            this.client.guildManager.all().then(guildDBs => {
                if (!guildDBs.find(guildDB => guildDB.id === guild.id)) {
                    this.client.guildManager.add(guild.id);
                    console.log(guild.name, 'added');
                }
            });
        });
        const activities = this.client.config.activites;
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * activities.length);
            this.client.user.setActivity(activities[randomIndex], {
                type: 'CUSTOM_STATUS'
            });
        }, this.client.config.interval_activity);
    }
}
exports.default = ReadyEvent;
