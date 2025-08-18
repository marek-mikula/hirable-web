import type {Candidate} from "~/repositories/resources";

export class CandidatePolicy {
    public show(candidate: Candidate): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        return user.value!.companyId === candidate.companyId;
    }
}
