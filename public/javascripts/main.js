$(()=>{
    $('.linkCampaign').on('click', (e)=>{
        e.preventDefault();

        // alert('linkCampaign clicked');
        linkCampaign(e.target.text);
    });
});

const linkCampaign = (campaignId)=>{
    try {
        const loadingHtml = `
            <tr>
                <th id='no-result' class='text-center sparkline-info' colspan='22'>
                    <h1><i class="fa fa-spinner fa-spin"></i></h1>
                </th>
            </tr>
        `;
        $('.tbl_detail tbody').append(loadingHtml);
        $.ajax({
            type: 'GET',
            url: '/api/fb/campaign',
            timeout: 10000,
            dataType: 'json',
            data: {
                campaignId
            },
            statusCode: {
                200: res => {
                    $('.tbl_detail tbody').empty();

                    let row = res.data;
                    
                    var rowCnt = row.testVar.length;
                    
                    let html = `
                        <tr>
                            <td class="align-middle" rowspan="${rowCnt}">${row.contentsAttr}</td>
                            <td class="align-middle" rowspan="${rowCnt}">${row.categoryNm}</td>
                            <td class="align-middle" rowspan="${rowCnt}">${row.prdNm}</td>
                    `;
                    var variants = row.testVar;

                    if (rowCnt > 1) {                                    
                        variants.forEach((element,index)=> {
                            
                            // rowspan=2인 내용 포함하여 모두 등록
                            if (index == 0) {
                                html += `
                                <td class="align-middle" rowspan="1">${element.var}</td>
                                <td class="align-middle" rowspan="1">${row.channel}</td>
                                <td class="align-middle" rowspan="1">이미지</td>
                                <td class="align-middle" rowspan="1">결과0</td>
                                <td class="align-middle" rowspan="2">유효성0</td>
                                <td class="align-middle" rowspan="1">0/00</td>
                                <td class="align-middle" rowspan="1">0/00</td>
                                <td class="align-middle" rowspan="1">20세 이상 남녀</td>
                                <td class="align-middle" rowspan="1">링크클릭</td>
                                <td class="align-middle" rowspan="1">959</td>
                                <td class="align-middle" rowspan="2">2222</td>
                                <td class="align-middle" rowspan="2">3333</td>
                                <td class="align-middle" rowspan="1">3333</td>
                                <td class="align-middle" rowspan="1">4444</td>
                                <td class="align-middle" rowspan="1">1111</td>
                                <td class="align-middle" rowspan="1">333</td>
                                <td class="align-middle" rowspan="1">342</td>
                                <td class="align-middle" rowspan="1">1222</td>
                                <td class="align-middle" rowspan="1">그래프</td>
                                </tr>
                                `;
                            } else {
                                html += `
                                <tr>
                                    <td class="align-middle" rowspan="1">${element.var}</td>
                                    <td class="align-middle" rowspan="1">${row.channel}</td>
                                    <td class="align-middle" rowspan="1">이미지2</td>
                                    <td class="align-middle" rowspan="1">Lose</td>
                                    <td class="align-middle" rowspan="1">0/00</td>
                                    <td class="align-middle" rowspan="1">0/00</td>
                                    <td class="align-middle" rowspan="1">20세 이상 남녀</td>
                                    <td class="align-middle" rowspan="1">링크클릭</td>
                                    <td class="align-middle" rowspan="1">1234</td>
                                    <td class="align-middle" rowspan="1">2222</td>
                                    <td class="align-middle" rowspan="1">3333</td>
                                    <td class="align-middle" rowspan="1">1111</td>
                                    <td class="align-middle" rowspan="1">1111</td>
                                    <td class="align-middle" rowspan="1">1111</td>
                                    <td class="align-middle" rowspan="1">1111</td>
                                    <td class="align-middle" rowspan="1">그래프2</td>
                                </tr>
                                `;
                            }                                        
                        })
                    } else {
                        // 실험변수가 1개이면 rowspan=1로 처리
                        html += `
                        <td class="align-middle" rowspan="1">${row.testVar[0].var}</td>
                            <td class="align-middle" rowspan="1">${row.channel}</td>
                            <td class="align-middle" rowspan="1">이미지</td>
                            <td class="align-middle" rowspan="1">결과0</td>
                            <td class="align-middle" rowspan="2">유효성0</td>
                            <td class="align-middle" rowspan="1">0/00</td>
                            <td class="align-middle" rowspan="1">0/00</td>
                            <td class="align-middle" rowspan="1">20세 이상 남녀</td>
                            <td class="align-middle" rowspan="1">링크클릭</td>
                            <td class="align-middle" rowspan="1">959</td>
                            <td class="align-middle" rowspan="2">2222</td>
                            <td class="align-middle" rowspan="2">3333</td>
                            <td class="align-middle" rowspan="1">3333</td>
                            <td class="align-middle" rowspan="1">4444</td>
                            <td class="align-middle" rowspan="1">1111</td>
                            <td class="align-middle" rowspan="1">1111</td>
                            <td class="align-middle" rowspan="1">1111</td>
                            <td class="align-middle" rowspan="1">1111</td>
                            <td class="align-middle" rowspan="1">그래프</td>
                        </tr>
                        `                                    
                    }
                    
                    $('.tbl_detail tbody').append(html);
                }
            },
            error: err => {
                $('.tbl_detail tbody').empty();

                const html = `
                <td class="text-muted text-center align-middle" colspan="22">
                    <h5 style="margin-bottom:0px;">데이터 로딩 실패 : ${err.statusText}</h5>
                </td>
                `;
                $('.tbl_detail tbody').append(html);
            }
        });
    } catch (error) {
        console.log(error);
    }    
}