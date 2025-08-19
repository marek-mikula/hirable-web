import type {Candidate} from "~/repositories/resources";
import {ROLE} from "~/types/enums";

export class CandidatePolicy {
    public show(candidate: Candidate): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        return user.value!.companyId === candidate.companyId;
    }

    public update(candidate: Candidate): boolean {
        const { user } = useAuth()

        if (!user.value) {
            return false
        }

        return this.show(candidate) && [
            ROLE.ADMIN,
            ROLE.RECRUITER,
        ].includes(user.value!.companyRole);
    }
}
