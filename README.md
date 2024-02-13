**Get Home Safe**



_Background and Motivation_


Our primary goal with this app is to establish a reliable means of monitoring the safety of friends and ensuring they have arrived home safely from any outing, such as getting home from the bar, leaving university late when campus is mostly deserted and many others. Walking alone or transportation options like Uber, other rideshares, and public transit can sometimes feel unsafe, particularly late at night. While it’s reassuring to have a friend know where you are and when you’re safely home in these scenarios, there’s no effective solution currently on the market.

_Objective and Scope_


We plan to prioritize privacy concerns by displaying only minimal location information, striking a balance between assuring others of your safety while respecting individual privacy boundaries. The application is designed for temporary or short-term location sharing. This is achieved using temporary sessions, allowing a group of friends to stay connected effortlessly without needing to share personal contact information. This differentiates our application from existing solutions such as Apple’s Find My and Life360 as individuals aren’t required to share account information (i.e. phone, email, social media) and share precise locations for a long period of time. A use case for application is at a corporate function with their team and wants to ensure that everyone gets home safe. Utilizing our application the members of the team can join by scanning a QR code, monitor if members of the group have arrived home, all without revealing personal information such as phone numbers and home addresses.

**Principles of Distributed Systems**



_Replication_


The purpose behind replication is to improve the system’s availability, scalability, and fault tolerance.

Employing Passive Replication

There will be a primary database containing all user information and a Party database for session information, and if there are state updates, it will update the replicas. By having several instances of our databases, there will be backups in case of data loss.

There will be multiple instances of both the user service, which means that the read/write processes will be replicated. Each instance will serve the client requests. This will allow us to load balance a greater influx of client requests during peak times.

There will be multiple instances of the party query service, which means that the read process will be replicated across all instances.

There will be multiple instances of the party command service, which means that the write process will be replicated across all instances.

_Communication_


Communication is simplified due to the separation of responsibilities. The reading and writing functionality are confined to their own respective components.

Upon first entry into the application, the users will need to set up their profiles. API gateway will communicate with the user service using the request/reply model to create profiles. The user service will write these new user profiles to the database asynchronously. After the user database has been updated, the updated state of the user data will be propagated through to the user database replicas.

API Gateway will publish users’ location updates every 30 seconds onto the message queue which will be picked up by the party command service. This is done through asynchronous processing.

The party command service will then use a request/reply communication model to check if the location received from the message queue is the user’s home address. This will be synchronous. Party command service will wait until the User Service gives a response.

The user service will then query the User Database using the request/reply model to retrieve the home address. After receiving the home address, the user service will respond to the party command service with a boolean value as to if the location provided is the users’ home address. This will be synchronous.

If the response received by the party command service from the user service is ‘yes’, then the command service will update the party database to change the users’ status. This will be synchronous.

After the database is updated, this updated state of the data will be propagated through to the party database replicas.

Every 120 seconds, the API gateway uses a request/reply model to communicate with the party query service and request the users’ status so that all the read models can be up to date. This will be done asynchronously.

_Synchronization_


We will maintain synchronization within our database by ensuring that our databases are multi-node and contain the same data updated when the main node is updated.

We also have a pub-sub system that maintains synchronization where all subscribers will receive the same data at the same time. We only plan to have one subscriber, however, this pattern will allow us to maintain this synchronization if we decide to scale up to new services that consume the data.

_Consistency_


Data: Data will be kept consistent through the pub-sub model where all subscribers will receive the same data at the same time (and in order), this will allow for consistent updates to the location of a user/party.

Message ordering: Using timestamps for location helps provide message ordering so that the party query service can get the latest location easily. Additionally, we also have a pub/sub system that would maintain order for messaging.

_Fault Tolerance_


Response to Process Failure
User Service & Party Command Service: These services have multiple nodes, which means if one of these services fail, the load of the node that went down will be distributed among the other nodes and the downed node will follow a recovery procedure where it will most likely be restarted.

Party Query Service: If this service fails, then apply 3 retries with backoffs and continue to display the previous data to the user and indicate to the user “information cannot be updated”.

_How Will the System Recover_


User & Party Database: The databases will have replicas where they will be used as backups in case the main one goes down.

Services: All services have multiple nodes, which means if one node goes down, the load of the node can be distributed among the other nodes while the downed node is restarted.

Execution of Requests More Than Once
If we added a caching layer it could help in this. Where if we have the same request coming in, we can prevent it from being processed by checking with the cache, this will help performance and not overload the database.

However, executing a request more than once shouldn’t really matter in our case because the requests will be received in order which means the latest location will always be saved. Additionally, adding new data to the database won’t replace any location updates.
