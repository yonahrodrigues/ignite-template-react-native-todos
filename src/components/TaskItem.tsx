import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "./TasksList";

import { EditTaskArgs } from "../pages/Home";

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
  task,
  editTask,
  removeTask,
  toggleTaskDone,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  //armazena valor localmente
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  //ref pra inserir cursor no input e integragir com teclado
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: taskNewTitleValue });
    setIsEditing(false);
  }

  //useeffect pra monitorar estado isedtting tru focus inputtext ou blur em caso de false
  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          //   testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            // testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {/* <Text style={task.done ? styles.taskTextDone : styles.taskText}>
            {task.title}
          </Text> */}

          <TextInput
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          ></TextInput>
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity
        // testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity> */}
      {/* //container dos icons */}
      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        {/* divisor icone */}
        <View style={styles.iconsDivider} />

        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196,196,196, 0.24)",
    marginHorizontal: 12,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    // paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
