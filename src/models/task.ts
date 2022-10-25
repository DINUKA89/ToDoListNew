import { Employee } from "./employee";

export class Tasks{
    Id!:number;
    Name!:string;
    Description!:string;
    AssignDate!:Date;
    CompletionDate!:Date;
    employee!:Employee;
}