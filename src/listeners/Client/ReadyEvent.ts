import { Listener } from "discord-akairo";
import type { TextChannel } from "discord.js";
import type AnimeClient from "../../classes/AnimeClient";

export default class ReadyEvent extends Listener {
    constructor(public client: AnimeClient) {
        super('ReadyEvent', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    public exec() {
        console.log(this.client.user!.tag, 'is ready');
        setInterval(() => {
            this.client.guilds.cache.forEach(async g => {
                const work = this.client.desu.class.getGuild(g.id);
                if (work) return;
                const guild = await this.client.guildManager.get(g.id);
                if (!guild || !guild.spawnChannel) return;
                this.client.desu.class.addGuild(g.id, this.client.channels.cache.get(guild!.spawnChannel) as TextChannel);
                console.log(g.name, 'appr');
            });
        }, 60 * 1000);
        // register each user to database.
        this.client.users.cache.forEach(user => {
            this.client.userManager.all().then(userDBs => {
                if (user.bot) return;
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
            this.client.user!.setActivity(activities[randomIndex], {
                type: 'CUSTOM_STATUS'
            });
        }, this.client.config.interval_activity);
    }
}