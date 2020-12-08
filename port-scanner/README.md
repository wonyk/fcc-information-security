## Information Security Projects - Port Scanner
This project is a self-made port scanner using Python. It has fulfilled all the requirements and tests of the [Information Security Projects - Port Scanner](https://www.freecodecamp.org/learn/information-security/information-security-projects/port-scanner) project.

## About
This is created as an assignment for Free Code Camp. It uses Python as the main programming language. Some libraries used are:
- Socket: Handling connections and testing if a port is open
- Re: Regex testing to see if the input is meant to be an IP address or a hostname

The assignment details are as follow:

### Assignment & Documentation

Create a port scanner using Python.

In the `port_scanner.py` file, there a function called `get_open_ports` that takes a `target` argument and a `port_range` argument. `target` can be a URL or IP address. `port_range` is a list of two numbers indicating the first and last numbers of the range of ports to check.

Here are examples of how the function may be called:
```
get_open_ports("209.216.230.240", [440, 445])
get_open_ports("www.stackoverflow.com", [79, 82])
```

The function will return a list of open ports in the given range.

The `get_open_ports` function will also take an optional third argument of `True` to indicate "Verbose" mode. If this is set to true, the function shourd return a descriptive string instead of a list of ports.

Here is the format of the string that would be returned in verbose mode (text inside `{}` indicates the information that should appear):
```
Open ports for {URL} ({IP address})
PORT     SERVICE
{port}   {service name}
{port}   {service name}
```
The dictionary in `common_ports.py` is imported to get the correct service name for each port.

For example, if the function is called like this:
```
port_scanner.get_open_ports("scanme.nmap.org", [20, 80], True)
```
It should return the following:
```
Open ports for scanme.nmap.org (45.33.32.156)
PORT     SERVICE
22       ssh
80       http
```

### Exception Handling

If the URL passed into the `get_open_ports` function is invalid, the function will return the string: "Error: Invalid hostname".

If the IP address passed into the `get_open_ports` function is invalid, the function will return the string: "Error:  Invalid IP address".

### Development

The code is written in `port_scanner.py`. For development, you can use `main.py` to test your code. Click the "run" button and `main.py` will run.

### Testing 

The unit tests for this project are in `test_module.py`. We imported the tests from `test_module.py` to `main.py` for your convenience. The tests will run automatically whenever you hit the "run" button.

## Acknowledgements
I would like to thank the official [Python3](https://docs.python.org/3.8/) documentation for their detailed description on the various libraries which I used in this project.

Also, I am thankful of the various guides online which clarified some of my assumptions on how sockets work, as well as allow me to learn more about networking concepts like blocking mode and parallel connections.

Lasly, thanks to FCC for linking and providing wonderful viedos which made the assignment much more manageable.
