---
layout: default
title: Configuration
nav_order: 2
---

# Configuration
{: .no_toc }


Configuration parameters.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---



## Database

```python
# backend/src/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'mysql.connector.django', 
        'NAME': env_var('DATABASE_NAME', 'incident_prod'),
        'USER': env_var('DATABASE_USER', 'root'),
        'PASSWORD': env_var('DATABASE_PWD', 'root'),
        'HOST': env_var('DATABASE_HOST', 'localhost'),   # Or an IP Address that your DB is hosted on
        'PORT': env_var('DATABASE_PORT', '3306'),
    }
}
```
Here it first looks for the particular variable value on environment by the method `env_var()`. When no value found, will use the 2nd parameter as the value.

OR

```yaml
# backend/.env
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PWD=toor
DATABASE_NAME=incidents
```

## Google reCaptcha

### reCaptcha secret key
{: .no_toc }
```yaml
# backend/.env
RECAPTCHA_SECRET_KEY=
```

### reCaptcha site key
{: .no_toc }
```yaml
# frontend/.env
REACT_APP_RECAPTCHA_SITEKEY=
```

If using docker, update the particular Dockerfile, adding as a environment variable, since build process taking place.
Therefore it should be added before `RUN npm run build`.
```yaml
ENV REACT_APP_RECAPTCHA_SITEKEY=
```