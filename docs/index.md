---
layout: default
title: Home
nav_order: 1
description: "Just the Docs is a responsive Jekyll theme with built-in search that is easily customizable and hosted on GitHub Pages."
permalink: /
---

# Incident Management System Documentation
{: .fs-9 }

An Incident Management System specialized for Elections.
{: .fs-6 .fw-300 }

[Get started now](#getting-started){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View it on GitHub](https://github.com/ECLK/IncidentManagement){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Getting started

### Dependencies

#### FRONTEND 
  - Language: Javascript
  - Framework: ReactJS

#### BACKEND
  - Language: Python
  - Framework: Django

### Quick start: Use Docker-Compose 

#### BACKEND
1. Make sure Docker is installed and running.
2. Navigate to `/backend` directory
3. Run ```$ docker-compose build```
4. Run ```$ docker-compose up``` <small>At the very first run django will start before mysql by which will result an error for django to start. Stop and re-run.</small>
5. Open a new terminal, navigate to `backend` folder
6. Run ```$ docker-compose exec djangoapp python manage.py migrate```
7. Run ```$ docker-compose exec djangoapp python manage.py createsuperuser``` and enter superuser information when prompted.
8. Run the seeder as ```$ docker-compose exec djangoapp python manage.py loaddata category channel province district police politicalparty segment```
9. In order to add predefined users, run users seeder as ```$ docker-compose exec djangoapp python manage.py loaddata users```
10. Server runs at 8000

As per quick start we have add users by seeders at `step-9`, where you can get and idea how the heirarchy is implemented within the system. You may skip `step-9` on production and have it your way.

#### FRONTEND 
1. Make sure backend server is running.
2. Navigate to `/frontend` directory.
3. Run ```$ docker-compose build```
4. Run ```$ docker-compose up```

This is production build, thus not development friendly. For development purposes try [Local Installation](#local-installation). 

### Local installation: 

1. Install the Ruby Gem
```bash
$ gem install just-the-docs
```
```yaml
# .. or add it to your your Jekyll site’s Gemfile
gem "just-the-docs"
```
2. Add Just the Docs to your Jekyll site’s `_config.yml`
```yaml
theme: "just-the-docs"
```
3. _Optional:_ Initialize search data (creates `search-data.json`)
```bash
$ bundle exec just-the-docs rake search:init
```
3. Run you local Jekyll server
```bash
$ jekyll serve
```
```bash
# .. or if you're using a Gemfile (bundler)
$ bundle exec jekyll serve
```
4. Point your web browser to [http://localhost:4000](http://localhost:4000)

If you're hosting your site on GitHub Pages, [set up GitHub Pages and Jekyll locally](https://help.github.com/en/articles/setting-up-your-github-pages-site-locally-with-jekyll) so that you can more easily work in your development environment.

### Configure Just the Docs

- [See configuration options]({{ site.baseurl }}{% link docs/configuration.md %})

---

## About the project

Just the Docs is &copy; 2017-2019 by [Patrick Marsceill](http://patrickmarsceill.com).

### License

Just the Docs is distributed by an [MIT license](https://github.com/pmarsceill/just-the-docs/tree/master/LICENSE.txt).

### Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change. Read more about becoming a contributor in [our GitHub repo](https://github.com/pmarsceill/just-the-docs#contributing).

#### Thank you to the contributors of Just the Docs!

<ul class="list-style-none">
{% for contributor in site.github.contributors %}
  <li class="d-inline-block mr-1">
     <a href="{{ contributor.html_url }}"><img src="{{ contributor.avatar_url }}" width="32" height="32" alt="{{ contributor.login }}"/></a>
  </li>
{% endfor %}
</ul>

### Code of Conduct

Just the Docs is committed to fostering a welcoming community.

[View our Code of Conduct](https://github.com/pmarsceill/just-the-docs/tree/master/CODE_OF_CONDUCT.md) on our GitHub repository.
