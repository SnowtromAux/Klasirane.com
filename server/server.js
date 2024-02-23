const express = require('express');
const cors = require('cors');
const ftp = require('basic-ftp');
const { Writable } = require('stream');

const app = express();
const port = 3001;

app.use(cors());

app.get('/home/:id', async (req, res) => {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: '127.0.0.1',
            user: 'lubod',
            password: '1234',
            secure: true,
            secureOptions: { rejectUnauthorized: false },
        });

        const remoteFilePath = `/home/${req.params.id}`;
        let text_to_send = '';
        const writableStream = new Writable({
            write(chunk, encoding, callback) {
              text_to_send += chunk.toString();
              callback();
            }
          });

        await client.downloadTo(writableStream , remoteFilePath)
        .then(()=>{
            res.status(200).send(text_to_send);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.get('/competitions/:competitionName/seasons', async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
      await client.access({
          host: '127.0.0.1',
          user: 'lubod',
          password: '1234',
          secure: true,
          secureOptions: { rejectUnauthorized: false },
      });

      const competitionFolderPath = `/competitions/${req.params.competitionName}`;
      const list = await client.list(competitionFolderPath);
      const seasons = list.map(folder => folder.name);

      res.status(200).json(seasons);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  } finally {
      await client.close();
  }
});

app.get('/competitions/:competitionName/:seasonName/years', async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
      await client.access({
          host: '127.0.0.1',
          user: 'lubod',
          password: '1234',
          secure: true,
          secureOptions: { rejectUnauthorized: false },
      });

      const seasonFolderPath = `/competitions/${req.params.competitionName}/${req.params.seasonName}`;
      const list = await client.list(seasonFolderPath);
      const years = list.map(folder => folder.name);

      res.status(200).json(years);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  } finally {
      await client.close();
  }
});

app.get('/competitions/:competitionName/:seasonName/:year/classes', async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
      await client.access({
          host: '127.0.0.1',
          user: 'lubod',
          password: '1234',
          secure: true,
          secureOptions: { rejectUnauthorized: false },
      });

      const classesFolderPath = `/competitions/${req.params.competitionName}/${req.params.seasonName}/${req.params.year}`;
      const list = await client.list(classesFolderPath);
      const classes = list.map(folder => folder.name);

      res.status(200).json(classes);
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  } finally {
      await client.close();
  }
});

app.get('/competitions/:competitionName/:seasonName/:year/:className/:pdfType', async (req, res) => {
    const { competitionName, seasonName, year, className, pdfType } = req.params;
    const pdfFileName = pdfType === 'probs' ? 'probs.pdf' : 'sol.pdf'; 
    const pdfFilePath = `/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfFileName}`;

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: '127.0.0.1',
            user: 'lubod',
            password: '1234',
            secure: true,
            secureOptions: { rejectUnauthorized: false },
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);

        
        await client.downloadTo(res, pdfFilePath);
    } catch (error) {
        console.error(error);
        res.send(false);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.get('/competitions/:competitionName/:seasonName/:year/:className/check-pdf/:pdfName', async (req, res) => {
    const { competitionName, seasonName, year, className, pdfName } = req.params;
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: '127.0.0.1',
            user: 'lubod',
            password: '1234',
            secure: true,
            secureOptions: { rejectUnauthorized: false },
        });

        const pdfFilePath = `/competitions/${competitionName}/${seasonName}/${year}/${className}/${pdfName}.pdf`;
        
        // Attempt to list the directory to check if the PDF exists
        const list = await client.list(`/competitions/${competitionName}/${seasonName}/${year}/${className}/`);
        const pdfExists = list.some(file => file.name === `${pdfName}.pdf`);

        res.json({ exists: pdfExists });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
