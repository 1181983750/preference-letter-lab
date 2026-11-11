(function(root) {
  function validAnswers(input, data) {
    if (!Array.isArray(input) || input.length > data.questions.length) return [];
    const out=[];
    for (const value of input) {
      if (!Number.isInteger(value) || value < 0 || value > 3) break;
      out.push(value);
    }
    return out;
  }
  function score(answers, data) {
    const clean=validAnswers(answers,data);
    if (clean.length !== data.questions.length) throw new Error('请完成全部题目');
    const sums=data.axes.map(()=>0), maxima=data.axes.map(()=>0);
    data.questions.forEach((q,i)=>{sums[q.axis]+=q.values[clean[i]];maxima[q.axis]+=Math.max(...q.values.map(Math.abs));});
    const values=sums.map((v,i)=>Math.round((v/maxima[i]+1)*50));
    const id=sums.map(v=>v>=0?'1':'0').join('');
    return {id,values,sums,maxima,result:data.results.find(r=>r.id===id),near:sums.map((v,i)=>Math.abs(v)/maxima[i]<=1/6?i:-1).filter(i=>i>=0)};
  }
  root.QuizRules={validAnswers,score};
})(typeof window==='undefined'?globalThis:window);
