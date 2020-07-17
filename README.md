# ad-2019 - Amigo secreto
# Para acessar em produção: (O envio de emails em produção está funcionando)

 - https://powerful-stream-10591.herokuapp.com/

# Para acessar localmente:
 Acesse a pasta frontend e execute o comando:
### npm install
### npm start

 Abra outro terminal, acesse a pasta backend e execute o comando:
### npm install
### node index.js

 Após isso a aplicação será aberta no navegador

### Para realizar o envio de emails, vá até backend/routes/pessoas e na função sendEmail, em transporter substitua user e pass pelo seu gmail e sua senha
### e em info substitua from pelo seu gmail. Pronto, agora a aplicação funcionará perfeitamente.

```js
  async function sendEmail(email, amigo) {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "seu gmail",
        pass: "sua senha",
      },
    });

    let info = await transporter.sendMail({
      from: "seu gmail",
      to: email,
      subject: "Seu amigo secreto",
      text: amigo,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
}
```
