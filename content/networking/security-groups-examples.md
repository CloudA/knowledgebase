/*
Title: Security Group Examples
Sort: 2
*/

This article contains a collection of common Security Group configurations and
questions about more complex configurations of Security Groups and Security
Group Rules.

## Web Server Security Group

Navigate to "Access & Security", under the "Servers" menu, then click "create
security group". Fill in your desired identifier and description for the new
security group. Note that your identifier can only contain upper or lower case
letters (no spaces or symbols).


![Create Security Group](/img/content/networking/web-security-group.png)

Then, edit your security group's rules to add the required ports by clicking
"Edit Rules".


![Web Security Group](/img/content/networking/security-group-list.png)

Click "Add Rule", and the Add Rule modal window will appear so you can add the
port to the group.

Make sure the protocol is set to TCP, and the set the port to 80.


![Security Group Add Rule](/img/content/networking/security-group-add-rule.png)

Now that you have port 80 configured, you'll also want to add 443 for HTTPS
traffic for your web security group. Simply go through the same process again,
but this time specify port 443, and hit Add again.

Your security group details should now list both 80 and 443, like below.

![Security Group New Rules](/img/content/networking/security-group-rules.png)


## Assigning A Security Group

The final step, now that we have created the "web" security group, is to add
the group to your instance that you want connected to the web. Head back to
your instance list, and click the "More" menu on the desired instance, then
"Edit security groups".

![Security Group Assigning Menu](/img/content/networking/security-group-assign.png)

This will open the "Edit Instance" window set to the "Security Groups" tab.
This view shows a list of all available Security Groups, along with any that
are already assigned to the instance. Clicking the + button on the "web"
security group listed in "All Security Groups" will place it in the right
column of assigned groups.

![Security Group Assigning](/img/content/networking/security-group-assign2.png)

After clicking save, your instance will be accessible on port 80 and 443. To
confirm this, you can open your instance details and see the list of open ports
will now include the assigned web ports!


## ICMP / Ping Rules

In order to allow servers to ping each other, or be reached via ICMP through
the Internet, you must create a Security Group Rule of protocol **ICMP**, type
**-1**, and code **-1**.

![Security Group Rule ICMP](/img/content/networking/security-group-icmp.png)


## CIDR Rundown

CIDR stands for "**Classless Inter-Domain Routing**", which allows you to easily
specify a subsection of IP addresses. In the context of Security Groups, it
permits you to open access to a group of IP addresses, rather than singularly or
globally. CIDRs are written as a *standard IP address*, followed by a *slash* (/),
then a *number* specifying the number of bits of address space you are
designating from **0 to 32**. Read a full definition of
[CIDR on Wikipedia](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing).

### Globally Open

If you wish to allow the Security Group port(s) to be accessed from ANY remote
IP address, you will specify the CIDR of `0.0.0.0/0`

### Internal Network Traffic

For internal access on an internal subnet of `10.0.0.0` with subnet mask
`255.255.255.0`, you would use a CIDR of `10.0.0.0/24`. If your internal
network used the mask `255.255.0.0` for a larger address space, you would
create a CIDR of `10.0.0.0/16`.

### Single Address

Finally, if you want to only allow access for the rules of a security group to
a single IP (office / home), you would create the most restrictive CIDR
possible, allowing only 1 address through using a `/32` designation. For
example, if your address were `76.11.212.12`, the CIDR would be
`76.11.212.12/32`. It is also worth noting that, for simplicity's sake, if
you want to open access to a single IP address, you may declare only the IP
without the `/32` designation as it will be appended on the back end for you.
