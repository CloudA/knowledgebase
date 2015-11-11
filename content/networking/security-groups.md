/*
Title: Security Groups
Sort: 0
*/

Network Security Groups allow you to open traffic on a port-by-port basis. 
This flexible model can extend to create any number of situations, whether
simple or complex while maintaining strict security.

## Restricted by Default

By default, a raw instance only has port 22 open so you can SSH in after 
it's created. We don't want to expose your servers to anything a brand new 
instance isn't prepared for. 

## Closed Port Behaviour

If access is attempted to a port/IP combination that is not permitted, no
connection will be established at all and the connection will time out when the
connecting client terminates.

## Best Practises

The best practise for creating your security groups is to make them as 
**specific** to a use case as possible. 

For example, one might create individual Security groups for SSH access, Web 
Server ports, DB server ports, and VPN access. A single instance (even 
individual ports on the same server) can belong to multiple security groups. 
For an application server, you could assign the server to all of the above
groups, opening them to the world. You may later consider that you do not 
want SSH access open, and you could simply remove the server from the SSH 
group rather than modifying a large group for all servers that belong to it. 

This practise will help you scale and manage your virtual network security
beyond just a few servers, while knowing exactly which servers can access which
resources and allow you to make quick security adjustments on the fly.


