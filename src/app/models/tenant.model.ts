export class Tenant {
  id: string;
  code: string;

  constructor(obj?: any) {

    if (!obj) {
      return;
    }

    this.id = obj.id;
    this.code = obj.code;

  }
}
