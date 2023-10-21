// ==UserScript==
// @name         wyzant.com jobs filter
// @namespace    https://github.com/solve64/userscripts
// @version      0.1
// @license      MIT; https://opensource.org/licenses/MIT
// @description  filter out jobs on Wyzant (for tutors)
// @author       solve64
// @match        https://www.wyzant.com/tutor/jobs*
// @grant        none
// ==/UserScript==

//ignore jobs with rate less than "minRate" and/or containing an ignored keyword from "ignores" (comma separated, case insensitive)
const ignores='typescript,assembly,mips'.toLowerCase().split(',');
const minRate=40;

function run()
{
    let jobs=document.getElementById('jobs-list').children;
    let ignoreds='';
    for(let i=0; i<jobs.length; i++)
    {
        let ignored=ignore(jobs[i]);
        if(ignored!='')
        {
            jobs[i].style.backgroundColor='#300';
            jobs[i].style.display='none';
            ignoreds+=' '+ignored+',';
        }
    }
    if(ignoreds!='')
    {
        let h1=document.getElementsByTagName('h1')[0];
        h1.innerHTML+='<button style="font-size:10pt">unhide'+ignoreds+'</button>';
        h1.onclick=function(){
            for(let i=0; i<jobs.length; i++)
            {
                jobs[i].style.display='block';
            }
        };
    }
}

function ignore(div)
{
    let rate=-1;

    //check rate
    let spans=div.getElementsByTagName('span');
    for(let i=0; i<spans.length; i++)
    {
        let s=spans[i].innerHTML;
        if(s.includes('Recommended rate: $'))
        {
            rate=s.split('Recommended rate: $')[1].split('/')[0];
            if(rate<minRate)
            {
                return rate;
            }
            break;
        }
        else if(s.includes('Required rate: $'))
        {
            rate=s.split('Required rate: $')[1].split('/')[0];
            if(rate<minRate)
            {
                return rate;
            }
            break;
        }
    }

    //check ignores list
    let ps=div.getElementsByTagName('p');
    for(let i=0; i<ps.length; i++)
    {
        let p=ps[i].innerHTML.toLowerCase();
        for(let j=0; j<ignores.length; j++)
        {
            if(p.includes(ignores[j]))
            {
                return ignores[j]+(rate==-1?'':':'+rate);
            }
        }
    }

    return '';
}

run();
