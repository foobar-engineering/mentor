# Mentor

Mentor is browser based tool for make your workshops and master classes simple to deliver. Very often when you want to perform workshop you need to prepare working environment for your students, usually it take some time either at home or even in auditorium. And it is rather difficult to do due to several reason.

# Concept
Basic idea is simple. We are deployng bunch of docker-in-docker containers each of them emulates "real server", theese dind containers has gotty on board which allows us to use any browser with web socket support as ssh client with simple basic auth builtin.

Teacher (person who is mentoring at master class or workshop) has an access to any student's environment with ability to manage student's workflow.

# Requirements
Because Mentor is ansible based you need ansible > 2.8, ansible role `angstwad.docker_ubuntu` installed on your host and debian-based server, root access.

# Installation

Define your host name in `inventory` file.

Define following defaults in `roles\infra\defaults\main.yaml`

```
workshop_src: "/Users/andy/work/patroni-class/ansible"
users_num: 2
tz: "Asia/Yekaterinburg"
```
`workshop_src` is local dir on a machine where you runs Mentor which will be copied to mentor server and mounted to student's container.

`users_num` is a number of students allowed to work on Mentor server. After init each student will get a host with basic auth  from `user0:pass0@example.com` till `user1:pass1@example.com` ... `userN:passN@example.com`, where N = `users_num`. 

`tz` is local timezone for student's container

And then run:

```
ansible-playbook -i inventory setup.yml --tags=setup
```

# How it works

After that 2 roles will be executed: 
 1. `angstwad.docker_ubuntu` which will install docker on your Mentor host (you may comment it if you've already installed it before) in `setup.yml`
 2. `infra`, which do all the job: 
    - copies Dockerfile to Mentor server for workshop image and build it onsite
    - creates home dir for every student, puts workshop's code here and mounts it into /workshop in student's dind
    - creates user_num dind containers and exposes ports outside Mentor server
    - creates spyglass container for teacher which serves simple static frontend for managing any student's workflow

# Workflow
Teacher creates as many users as required, ususally about 16-32, and assigning credentials at very begining of workshop to students (either print them on paper, or sending via messages). 
By default credentials looks like: `user0:pass0@example.com`, you may change it to something more sophisticated by changing that `"{{ 'user%d'|format(item) }}:{{ 'pass%d'| format(item) }}"` in `roles\infra\tasks\main.yaml`

Students checks if everithing is works in any modern browser, even if gotty is perfect sometime personal security settings can cause an hassle, please, ensure every ad blocker is disabled.

Code for workshop is laying in `/workshop`.

Teacher's personal screen (spyglass) is availible at `example.com` with no extra credentials or ports.

Have a nice workshop!

At the end clean it up using
```
ansible-playbook -i inventory setup.yml --tags=teardown
```

# Misc
Mentor was created as a part of pgconf2019 workshop [Simple postgres HA using patroni, ansible, s3, wal-g](https://pgconf.ru/2019/242821)
