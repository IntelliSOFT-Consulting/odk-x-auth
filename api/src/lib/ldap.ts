import ldap from 'ldapjs';
import { resolve } from 'path';



let LDAP_HOST = process.env['LDAP_HOST'] || 'http://localhost:8080'

let client = ldap.createClient({
    url: [LDAP_HOST]
})


// client.

const createUser = async (email: string) => {

    const entry = {
        cn: 'foo', sn: 'bar', email: [email], objectclass: 'fooPerson'
    };

    return new Promise(resolve => {
        client.add('cn=foo, o=example', entry, (err) => {
            console.error(err)
            resolve(false ?? true)
        });
    })

}

const search = async (filter: string) => {


}