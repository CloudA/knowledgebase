/*
Title: Security Groups
*/

By default, a raw instance only has port 22 open so you can SSH in after it's
created. We don't want to expose your servers to anything a brand new instance
isn't prepared for. To manage access, we use Security Groups. The best practise
for security groups, is to make them as specific as possible. A single instance
can belong to multiple security groups, so for a web server, you might want
ports 22, 443, and 80 open. Or for a DB server you might want port 5432 open
for PostgreSQL.

If access is attempted to a port/IP combination that is not assigned, no
connection will be established at all and the connection will time out.

The default security group has just port 22 open, so we'll create a brand new
one named "Web" for a web server as an example.

## Creating a "Web" Security Group

Navigate to "Access & Security", under the "Servers" menu, then click "create
security group". Fill in your desired identifier and description for the new
security group. Note that your identifier can only contain upper or lower case
letters (no spaces or symbols).


![Create Securit Group](/img/content/networking/web-security-group.png)

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


### Assigning the new group

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
the internet, you must create a Security Group Rule of protocol **ICMP**, type
**-1**, and code **-1**.

![Security Group Rule ICMP](/img/content/networking/security-group-icmp.png)

The above screenshot shows an example of opening ICMP traffic to all internal
traffic on the `10.0.0.0/24` subnet, which will only allow the traffic for
servers between the addresses `10.0.0.1` and `10.0.0.254`.
