import { EvaluationGetAll } from "./EvaluationGetAll";

export class UserProfile {
    username: string;
    email: string;
    role: string;

    evaluations?: EvaluationGetAll[];
}
