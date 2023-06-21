console.log('background.js ok');

async function gasJawab() {
  let text = window.getSelection().toString();
  console.log(text);
  if (text != '') {
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-xxxx`, //CHANGE THIS https://platform.openai.com/account/api-keys
        },
        body: JSON.stringify({
                "model": "text-davinci-003",
                "prompt": "Selesaikan soal ini dengan jawaban sederhana \n\nQuestion : " + text + "\nAnswer :",
                "max_tokens": 100,
                "temperature": 0,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0
               // "stop": ["\n"]
            }),
      });
      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        console.log(data);
        let jawabane = data.choices[0].text.trim();
        console.log(jawabane);
        if (!jawabane.endsWith('.')) {
          jawabane += '.';
        }
        alert(jawabane);
      } else {
        console.error("API Response:", data);
        alert("gagal coba lagi.");
      }
    } catch (error) {
      alert(error);
    }
  } else {
    alert('Pilih teks dulu lalu klik ikon merah.');
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: gasJawab
  });
});
