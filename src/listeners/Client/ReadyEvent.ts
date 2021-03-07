import { Listener } from "discord-akairo";
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
        // register each user to database.
        this.client.users.cache.forEach(user => {
            this.client.userManager.add(user.id);
            console.log(user.tag, 'added');
        });

        // register each guild to database.
        this.client.guilds.cache.forEach(guild => {
            this.client.guildManager.add(guild.id);
            console.log(guild.name, 'added');
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