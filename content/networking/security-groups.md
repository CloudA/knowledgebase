/*
Title: Security Groups
Sort: 0
*/

Network Security Groups allow you to open traffic on a port-by-port basis.
This flexible model can extend to create any number of situations, whether
simple or complex while maintaining strict security.

### Restricted by Default

By default, a raw instance only has port 22 open so you can SSH in after
it's created. We don't want to expose your servers to anything a brand new
instance isn't prepared for.

### Closed Port Behaviour

If access is attempted to a port/IP combination that is not permitted, no
connection will be established at all and the connection will time out when the
connecting client terminates.

### Best Practises

The best practise for creating your Security Groups is to make them as
**specific** to a use case as possible in order to retain flexibility. The
screenshot below shows an example of use-case groups being assigned to a server.

![Security Group Assignment](/img/content/networking/security-group-multi-assign.png)

For example, one might create individual Security Groups for SSH (port
22), Web Server ports (80 / 443), DB server ports (3306 / 1433 / 5432), and
VPN access (port 1194). A single instance (even individual ports on the same
server) can have multiple Security Groups assigned. For an application
server, you could assign all of the above groups, thus opening it to the
world on the defined ports.

You may later consider that exposing all ports, or ports which don't need to
be exposed, can lead to unauthorized access. After you determine that you do
not want SSH access open, and you could then remove the SSH Security
Group from the server rather than modifying a large group for all servers that
belong to it.

This practise will help you scale and manage your virtual network security
beyond just a few servers, while knowing exactly which servers can access which
resources and allow you to make quick security adjustments on the fly.


