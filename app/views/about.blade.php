{% extends('_layouts/default') %}
{% set title = "About" %}

{% block content %}

<h1>Group Topics</h1>

<p>One of our goals is to build a recommendation engine so it's important to be able to identify and track groups that use the topics. Here is how the overall architecture looks in my mind. There would be 4 areas where topics get "weight" for recommendation.</p>

<h2>General public voting on a topic:</h2>

<p>This is more of the Reddit/Digg style of voting. A topic is suggested and anyone can vote, up or down, on it one time from a general public perspective on if the topic interest them. We would give this vote a weight of lets say 10 points.</p>

<h2>Group Specific Topic (Campaign):</h2>

<p>This is where a group takes topics from the general pool and put them up for a vote for their specific group as a topic. Individuals of that group will have a couple options If they had already voted on the topic in the public stream they can apply that vote to this campaign. They can also reverse their public vote for the campaign. For example there is a TDD topic that interest them so they up-vote it on the public stream, which factors into the recommendation engine, but they feel their specific group have done too many presentations on Testing and want to see something difference so when the topic is presented as a campaign for their group they down-vote it for this specific campaign. We might give these results an overall weight of 20 points in the recommendation engine because they are more targeted interest.</p>

<h2>Executed Topics:</h2>

<p>These would be topics that groups had developed campaigns on and then did a presentation on. The group would then let GroupTopics know. This would accomplish a couple things. One we would add weight to this topic for the execution, say about another 10 points. Also it will let the recommendation engine know not to suggest that exact topic to that group again for a period of time, or at very less reduce its overall weight score for that specific group by a percentage to avoid recommending it again.</p>

<h2>Topic Resources:</h2>

<p>Finally we have topic resource. When a topic is executed on, the group will have the option to add their resources to the topic for future group to use. Maybe a topic gets a weight of 1 point per source, the more resources it has the more weight it gets. This bumps it up when recommending to other groups.</p>

<p>Ultimately, topics that are campaigned, executed, and resourced will end up with very high weights and bump up the recommendation to other groups that search for topics that match the tags for these topics.</p>

{% endblock %}
