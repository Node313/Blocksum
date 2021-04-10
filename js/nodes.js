async function getNodesData() {
  try {
    await getPoolInfo('https://ghcdn.rawgit.org/kryptokrona/kryptokrona-nodes-list/master/nodes.json').then(async (dataB) => {
      var tbodyRef = document.getElementById('nodeList').getElementsByTagName('tbody')[0];
      for (let i = 0; i < dataB.nodes.length; i++) {
        fetchWithTimeout(
          'http://' + dataB.nodes[i].url + ':' + dataB.nodes[i].port + '/getinfo',
          { headers: { Accept: 'application/json' } },
          500
        ).then((response) => response.json())
          .then((dataA) => {
            var tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${dataB.nodes[i].name}</td>
            <td>${dataB.nodes[i].url}:${dataB.nodes[i].port}</td>
            <td>${dataB.nodes[i].fee}%</td>
            <td>${dataB.nodes[i].version}</td>
            <td>${numberWithCommas(dataA.height)}</td>
            <td>${numberWithCommas(dataA.incoming_connections_count)}/${numberWithCommas(dataA.outgoing_connections_count)} (${dataA.tx_pool_size})</td>
            <td><span class="badge bg-success">Online</span></td>`;
            tbodyRef.appendChild(tr);
          }).catch((error) => {
            var tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${dataB.nodes[i].name}</td>
            <td>${dataB.nodes[i].url}:${dataB.nodes[i].port}</td>
            <td>${dataB.nodes[i].fee}%</td>
            <td>${dataB.nodes[i].version}</td>
            <td>-</td>
            <td>-</td>
            <td><span class="badge bg-danger">Offline</span></td>`;
            tbodyRef.appendChild(tr);
          })
      }
    });
  } catch (e) {
    console.log(e)
  }
}

getNodesData();
