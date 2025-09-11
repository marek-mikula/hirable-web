import type {Client} from "~/repositories/Client";

export abstract class Repository {
    constructor(protected client: Client) {}
}