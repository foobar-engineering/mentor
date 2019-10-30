# Mentor

Mentor is a browser-based tool to make your workshops and masterclasses simple to deliver. Very often when you want to perform a workshop you need to prepare a working environment for your students, usually, it takes some time either at home or even in the auditorium. And it is rather difficult to do due to several reasons.

# Demo
![example2 gif](https://mastery-public.s3.amazonaws.com/ezgif-5-c5188cad21df.gif)

# Concept
The basic idea is simple. We are deploying a bunch of docker-in-docker containers each of them emulates a "real server", these dind containers has gotty on board which allows us to use any browser with web socket support as ssh client with simple basic auth builtin.

The teacher (person who is mentoring at master class or workshop) has access to any student's environment with the ability to manage student's workflow using spyglass (simple SPA built with React served by container with same name).

# Requirements
Because Mentor is ansible based you need ansible > 2.8, ansible role `angstwad.docker_ubuntu` installed on your host and debian-based server, root access. Role could be installed via `sudo ansible-galaxy install angstwad.docker_ubuntu`.
If you are want to use spyglass you also have to install extension  called Multipass https://krtek4.github.io/MultiPass/ into your favourite browser (doesn't work for safari https://github.com/krtek4/MultiPass/issues/53). Multipass allow you save all credentials for basic auth for all students in one place.

# Installation

![example gif](https://mastery-public.s3.amazonaws.com/mentor.gif)

Define your hostname in `inventory` file.

Define following defaults in `roles/infra/defaults/main.yaml`

```
mentor_root: "/srv/mentor"
workshop_src: "/Users/andy/work/patroni-class/ansible"
users_num: 2
tz: "Asia/Yekaterinburg"
mentor_base_url: "http://{{ inventory_hostname }}"
mentor_container_prefix: "mentor"
mentor_user_container: "{{ mentor_container_prefix }}_dind_user"
mentor_spyglass_container: "{{ mentor_container_prefix }}_spyglass"
```

`mentor_root` is server dir on a server where Mentor will work.

`workshop_src` is local dir on a machine where you run Mentor which will be copied to mentor server and mounted to student's container.

`users_num` is a number of students allowed to work on Mentor server. After init each student will get a host with basic authentication from `user0:pass0@example.com` till 

`user1:pass1@example.com` ... `userN:passN@example.com`, where N = `users_num`.

`tz` is local timezone for student's container

`mentor_base_url` is url for your Mentor environment

`mentor_container_prefix` is prefix for distinguis containers on host

`mentor_user_container` is student's containers name

`mentor_spyglass_container` is teacher's container name


And then run:

```
ansible-playbook -i inventory setup.yml
```


or if you've already have `angstwad.docker_ubuntu` installed just:

```
ansible-playbook -i inventory setup.yml --tags=setup
```

# How it works

After that 2 roles will be executed:
 1. `angstwad.docker_ubuntu` which will install docker on your Mentor host (you may comment it if you've already installed it before) in `setup.yml`
 2. `infra`, which do all the job:
    - copies Dockerfile to Mentor server for workshop image and build it onsite
    - creates home dir for every student, puts workshop's code here and mounts it into `/workshop` in student's dind container
    - creates user_num dind containers and exposes ports outside Mentor server
    - creates spyglass container for teacher which serves simple static frontend for managing any student's workflow
    - generates MultiPass config in console for you

# Workflow
The teacher creates as many users as required, usually about 16-32, and assigning credentials at the very beginning of the workshop to students (either print them on paper or sending via messengers).

By default credentials looks like: `user0:pass0@example.com`, you may change it to something more sophisticated by changing that `"{{ 'user%d'|format(item) }}:{{ 'pass%d'| format(item) }}"` in `roles\infra\tasks\main.yaml`

Students check if everything is working in any modern browser, even if gotty is perfect sometimes personal security settings can cause a hassle, please, ensure every ad blocker is disabled.

Code for workshop is laying in `/workshop`.

The teacher's screen (spyglass) is available at `example.com` with no extra credentials or ports.

Have a nice workshop!

At the end clean it up using
```
ansible-playbook -i inventory setup.yml --tags=teardown
```

# Misc
Mentor was created as a part of pgconf2019 workshop [Simple postgres HA using patroni, ansible, s3, wal-g](https://pgconf.ru/2019/242821)
