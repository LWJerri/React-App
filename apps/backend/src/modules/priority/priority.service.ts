import { Injectable } from "@nestjs/common";
import { $Enums } from "@prisma/client";

@Injectable()
export class PriorityService {
  async getPriorities(): Promise<typeof $Enums.Priority> {
    const priorities = $Enums.Priority;

    return priorities;
  }
}
