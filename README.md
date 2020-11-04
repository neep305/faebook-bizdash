### 광고(Ad) 기준으로 Graph API 쿼리하는 방법
> Graph API를 통해 특정값을 결과를 얻을 경우 **fields**에 쿼리하고자 하는 필드를 지정한다. 캠페인ID를 기준으로 level을 ad로 지정하면 된다. 중요한 점은 Business Manager에 노출되는 컬럼명과 fields의 key name이 일치하지 않는다는 점이다.
<br>예를 들어, Business Manager에 노출되는 '**3-Second Video Views**'는 **actions.video_view**의 값과 일치한다. '**Link Clicks**'는 Graph API field의 **inline_link_clicks**과 일치한다.

아래 URL은 Graph API를 활용하여 광고(Ad) Insight 데이터를 가져오는 예제이다.
```shell
23843444599490759/insights?fields=["ad_id","ad_name","impressions","inline_link_clicks","campaign_id","campaign_name","cpc","video_10_sec_watched_actions","actions"]&level=ad&date_preset=last_30d
```