import React, {useState, useCallback, useEffect} from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';

import TaskList from './src/components/TaskList/';

const AnimatadButton = Animatable.createAnimatableComponent(TouchableOpacity);

export default function tarefas() {
  const [task, setTesk] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function loadTask() {
      const taskStorege = await AsyncStorage.getItem('@task');

      if (taskStorege) {
        setTesk(JSON.parse(taskStorege));
      }
    }

    loadTask();
  }, []);

  useEffect(() => {
    async function saveTask() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTask();
  }, [task]);

  function handlerAdd() {
    if (input === '') return;

    const data = {
      key: input,
      task: input,
    };

    setTesk([...task, data]);
    setOpen(false);
    setInput('');
  }

  const handlerDelete = useCallback(data => {
    const find = task.filter(r => r.key !== data.key);
    setTesk(find);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Minhas tarefas</Text>
      </View>

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={item => String(item.key)}
        renderItem={({item}) => (
          <TaskList data={item} handlerDelete={handlerDelete} />
        )}
      />

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Icon
                style={{marginLeft: 5, marginRight: 5}}
                name="arrowleft"
                size={35}
                color="#FFF"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Nova tarefa</Text>
          </View>

          <Animatable.View
            style={styles.modalBody}
            animation="fadeInUp"
            useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              style={styles.input}
              placeholder="Oque precisa fazer hoje?"
              value={input}
              onChangeText={texto => setInput(texto)}
            />

            <TouchableOpacity style={styles.handlerAdd} onPress={handlerAdd}>
              <Text style={styles.handlerAddText}>Salvar</Text>
            </TouchableOpacity>
          </Animatable.View>
        </SafeAreaView>
      </Modal>

      <AnimatadButton
        style={styles.fab}
        animation="bounceInUp"
        duration={1500}
        useNativeDriver
        onPress={() => setOpen(true)}>
        <Text style={styles.textAdd}>+</Text>
      </AnimatadButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'sans-serif-condensed',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094ff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  textAdd: {
    fontSize: 36,
    color: '#fff',
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF',
    fontFamily: 'sans-serif-condensed',
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },

  handlerAdd: {
    backgroundColor: '#fff',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },

  handlerAddText: {
    fontSize: 20,
    color: '#323232',
  },
});
