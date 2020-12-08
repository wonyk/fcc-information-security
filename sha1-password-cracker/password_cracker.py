import hashlib

def get_hash(string):
    return hashlib.sha1(bytes(string, 'utf-8')).hexdigest()

def crack_sha1_hash(hash, **kwargs):
    passwdfile = open('top-10000-passwords.txt', 'r')
    pw_list = passwdfile.read().split()
    passwdfile.close()

    saltfile = open('known-salts.txt', 'r')
    salt_list = saltfile.read().split()
    saltfile.close()

    for passwd in pw_list:
        # Try to crack it without salt first
        calc_hash = get_hash(passwd)
        if (hash == calc_hash):
            return passwd
        
        if ('use_salts' in kwargs):
            for salt in salt_list:
                calc_hash_salt = get_hash(passwd + salt)
                calc_salt_hash = get_hash(salt + passwd)
                if (hash == calc_hash_salt or hash == calc_salt_hash):
                    return passwd

    return "PASSWORD NOT IN DATABASE"
    