---
layout: industry
title: Healthcare
permalink: /industries/healthcare/
---

{% assign industry_data = site.data.industries.healthcare %}

{{ industry_data | jsonify | replace: '=>', ':' | json2yaml }}