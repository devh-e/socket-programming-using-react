<h1>리엑트로 배우는 소켓프로그래밍</h1>

<p>
안녕하세요. hee 입니다. 먼저 <b>리엑트로 배우는 소켓프로그래밍</b>에 관심으르 가져주셔서 감사합니다.<br>
해당 페이지는 독자님들의 피드백을 반영하고 오탈자를 수정하기 위해 제작되었습니다.
<br/>두번째 책에서는 이런 오탈자가 최대한 나오지 않도록 노력하겠습니다. 🙏
감사합니다.
</p>

<h2>브라우저 접속 포트번호 오타</h2>
<ul>
<li><span><b>위치:</b></span><span> PART 1 소켓통신 75페이지</span></li>
<li><span><b>수정 전:</b></span><span>http://localhost:5000</span></li>
<li><span><b>수정 후:</b></span><span>http://localhost:<b style="color:red;">3000</b></span></li>
</ul>
<code>
포트번호 오타가 있습니다. 만약 client 접속번호를 따로 변경하지 않으셨다면 CRA의 기본 접속 포트인 3000번으로 접속하시면됩니다.
<br>
소켓서버: localhost:5000<br>
클라이언트: localhost:3000 
</code>
