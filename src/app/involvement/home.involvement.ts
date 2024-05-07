export class HomeInvolvement {
    static LoadNameUser(): string {
        const tokenUser: any = sessionStorage.getItem('tokenLogin');
        if (!tokenUser) return '';
        return JSON.parse(tokenUser).name
    }
}