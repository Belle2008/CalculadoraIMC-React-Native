
import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {

  // Número mostrado na tela
  const [valor, setValor] = useState('0');

  // Primeiro número da operação
  const [numeroAnterior, setNumeroAnterior] = useState<number | null>(null);

  // Operação atual
  const [operacao, setOperacao] = useState('');

  /*
    Adiciona números na tela
  */
  function adicionarNumero(numero: string) {

    // Se estiver em 0, substitui
    if (valor === '0') {
      setValor(numero);
      return;
    }

    // Concatena os números
    setValor(valor + numero);
  }

  /*
    Limpar tudo
  */
  function limpar() {

    setValor('0');
    setNumeroAnterior(null);
    setOperacao('');
  }

  /*
    Adiciona ponto decimal
  */
  function adicionarPonto() {

    if (!valor.includes('.')) {
      setValor(valor + '.');
    }
  }

  /*
    Salva operação
  */
  function escolherOperacao(tipo: string) {

    setNumeroAnterior(parseFloat(valor));
    setOperacao(tipo);
    setValor('0');
  }

  /*
    Calcula resultado
  */
  function calcular() {

    if (numeroAnterior === null) {
      return;
    }

    const numeroAtual = parseFloat(valor);

    let resultado = 0;

    switch (operacao) {

      case '+':
        resultado = numeroAnterior + numeroAtual;
        break;

      case '-':
        resultado = numeroAnterior - numeroAtual;
        break;

      case '×':
        resultado = numeroAnterior * numeroAtual;
        break;

      case '÷':

        if (numeroAtual === 0) {
          setValor('Erro');
          return;
        }

        resultado = numeroAnterior / numeroAtual;
        break;
    }

    setValor(resultado.toString());
    setOperacao('');
    setNumeroAnterior(null);
  }

  /*
    Cria botão reutilizável
  */
  function Botao({
    texto,
    onPress,
    tipo = 'numero'
  }: any) {

    return (

      <TouchableOpacity
        style={[
          styles.botao,

          tipo === 'operacao' && styles.botaoOperacao,
          tipo === 'igual' && styles.botaoIgual,
          tipo === 'limpar' && styles.botaoLimpar,
        ]}
        onPress={onPress}
      >

        <Text style={styles.textoBotao}>
          {texto}
        </Text>

      </TouchableOpacity>
    );
  }

  return (

    <View style={styles.container}>

      {/* VISOR */}
      <View style={styles.areaVisor}>

        <Text style={styles.textoVisor}>
          {valor}
        </Text>

      </View>

      {/* BOTÕES */}
      <View style={styles.areaBotoes}>

        {/* LINHA 1 */}
        <View style={styles.linha}>

          <Botao
            texto="C"
            onPress={limpar}
            tipo="limpar"
          />

          <Botao
            texto="÷"
            onPress={() => escolherOperacao('÷')}
            tipo="operacao"
          />

        </View>

        {/* LINHA 2 */}
        <View style={styles.linha}>

          <Botao texto="7" onPress={() => adicionarNumero('7')} />
          <Botao texto="8" onPress={() => adicionarNumero('8')} />
          <Botao texto="9" onPress={() => adicionarNumero('9')} />

          <Botao
            texto="×"
            onPress={() => escolherOperacao('×')}
            tipo="operacao"
          />

        </View>

        {/* LINHA 3 */}
        <View style={styles.linha}>

          <Botao texto="4" onPress={() => adicionarNumero('4')} />
          <Botao texto="5" onPress={() => adicionarNumero('5')} />
          <Botao texto="6" onPress={() => adicionarNumero('6')} />

          <Botao
            texto="-"
            onPress={() => escolherOperacao('-')}
            tipo="operacao"
          />

        </View>

        {/* LINHA 4 */}
        <View style={styles.linha}>

          <Botao texto="1" onPress={() => adicionarNumero('1')} />
          <Botao texto="2" onPress={() => adicionarNumero('2')} />
          <Botao texto="3" onPress={() => adicionarNumero('3')} />

          <Botao
            texto="+"
            onPress={() => escolherOperacao('+')}
            tipo="operacao"
          />

        </View>

        {/* LINHA 5 */}
        <View style={styles.linha}>

          <Botao texto="0" onPress={() => adicionarNumero('0')} />

          <Botao
            texto="."
            onPress={adicionarPonto}
          />

          <Botao
            texto="="
            onPress={calcular}
            tipo="igual"
          />

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /*
    TELA PRINCIPAL
  */
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },

  /*
    VISOR
  */
  areaVisor: {
    padding: 25,
    alignItems: 'flex-end',
    marginBottom: 20,
  },

  textoVisor: {
    color: '#FFFFFF',
    fontSize: 70,
    fontWeight: '300',
  },

  /*
    ÁREA DOS BOTÕES
  */
  areaBotoes: {
    paddingBottom: 30,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 15,
  },

  /*
    BOTÕES PADRÃO
  */
  botao: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /*
    BOTÕES DE OPERAÇÃO
  */
  botaoOperacao: {
    backgroundColor: '#FF9500',
  },

  /*
    BOTÃO IGUAL
  */
  botaoIgual: {
    backgroundColor: '#34C759',
  },

  /*
    BOTÃO LIMPAR
  */
  botaoLimpar: {
    backgroundColor: '#A5A5A5',
  },

   /*
    TEXTO DOS BOTÕES
  */
    textoBotao: {
      color: '#FFFFFF',
      fontSize: 35,
      fontWeight: '500',
    },
  
  });