import socket
import common_ports
import re

def get_open_ports(target, port_range, *kwargs):
    start = port_range[0]
    end = port_range[1]

    # when ip_only is true, the verbose output will only show ip and not url (ip)
    ip_only = True

    regex_ip = re.search("^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", target)

    if (regex_ip == None):
        ip_only = False
        # try to get IP from hostname
        try:
            ip_addr = socket.gethostbyname(target)
        except socket.gaierror:
            return "Error: Invalid hostname"
    else:
        try:
            # First put the ip into ip_addr and modify target to become the hostname as default
            ip_addr = target
            target = socket.gethostbyaddr(target)[0]
            ip_only = False
        except socket.gaierror:
            return "Error: Invalid IP address"
        except:
            pass
    
    open_ports = []

    for port in range(start, end + 1):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(1)

        if s.connect_ex((ip_addr, port)) == 0:
            open_ports.append(port)
    
        s.close()
    
    if kwargs and kwargs[0] == True:
        host_info = target

        if not ip_only:
            host_info += ' ({})'.format(ip_addr)

        verboose_str = 'Open ports for {}\n'.format(host_info)
        verboose_str += 'PORT     SERVICE'

        for open_p in open_ports:
            svc_name = common_ports.ports_and_services.get(open_p)
            verboose_str += '\n{}{}'.format(str(open_p).ljust(9), svc_name)

        return verboose_str
    
    return(open_ports)